package com.woowacourse.gongcheck.auth.application;

import static com.woowacourse.gongcheck.auth.domain.Authority.HOST;

import com.woowacourse.gongcheck.auth.application.response.SocialProfileResponse;
import com.woowacourse.gongcheck.auth.application.response.TokenResponse;
import com.woowacourse.gongcheck.auth.presentation.request.TokenRequest;
import com.woowacourse.gongcheck.core.domain.host.Host;
import com.woowacourse.gongcheck.core.domain.host.HostRepository;
import com.woowacourse.gongcheck.infrastructure.oauth.GithubOauthClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HostAuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final GithubOauthClient githubOauthClient;
    private final HostRepository hostRepository;

    public HostAuthService(final JwtTokenProvider jwtTokenProvider, final GithubOauthClient githubOauthClient,
                           final HostRepository hostRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.githubOauthClient = githubOauthClient;
        this.hostRepository = hostRepository;
    }

    @Transactional
    public TokenResponse createToken(final TokenRequest request) {
        SocialProfileResponse socialProfileResponse = githubOauthClient.requestSocialProfileByCode(request.getCode());
        boolean alreadyJoin = hostRepository.existsByGithubId(socialProfileResponse.getGithubId());
        Host host = findOrCreateHost(alreadyJoin, socialProfileResponse);
        String token = jwtTokenProvider.createToken(String.valueOf(host.getId()), HOST);
        return TokenResponse.of(token, alreadyJoin);
    }

    private Host findOrCreateHost(final boolean alreadyJoin, final SocialProfileResponse socialProfileResponse) {
        if (alreadyJoin) {
            return hostRepository.getByGithubId(socialProfileResponse.getGithubId());
        }
        return hostRepository.save(socialProfileResponse.toHost());
    }
}
