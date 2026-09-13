package com.cognifyz.task7.Services;

import com.cognifyz.task7.Exception.GithubApiException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GitHubServices {
    private final RestClient restClient;
    public  GitHubServices() {
        this.restClient = RestClient.builder().baseUrl("https://api.github.com")
                        .defaultHeader("Accept", "application/vnd.github+json")
                        .build();
    }

    public Map<String, Object> getProfile(String accessToken) {

        try {
            return restClient
                    .get()
                    .uri("/user")
                    .header("Authorization", "Bearer " + accessToken)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});
        }catch (HttpClientErrorException.Unauthorized e){
            throw new GithubApiException(
                    "GitHub authentication has expired. Please login with GitHub again.",
                    401
            );
        }catch (HttpClientErrorException.Forbidden e) {

            throw new GithubApiException(
                    "GitHub denied the request or the GitHub API rate limit was reached.",
                    403
            );

        } catch (HttpClientErrorException.NotFound e) {

            throw new GithubApiException(
                    "Requested GitHub resource was not found.",
                    404
            );

        } catch (HttpServerErrorException e) {

            throw new GithubApiException(
                    "GitHub service is temporarily unavailable.",
                    503
            );

        } catch (ResourceAccessException e) {

            throw new GithubApiException(
                    "Unable to connect to GitHub. Please try again later.",
                    503
            );
        }


    }


    public List<Map<String, Object>> getRepositories(String accessToken) {
        try {
            return restClient
                    .get()
                    .uri("/user/repos"
                            + "?sort=updated"
                            + "&direction=desc"
                            + "&per_page=20")
                    .header("Authorization", "Bearer " + accessToken)
                    .retrieve()
                    .body(new ParameterizedTypeReference<List<Map<String, Object>>>() {});
        }catch (HttpClientErrorException.Unauthorized e){
            throw new GithubApiException(
                    "GitHub authentication has expired. Please login with GitHub again.",
                    401
            );
        }catch (HttpClientErrorException.Forbidden e) {

            throw new GithubApiException(
                    "GitHub denied the request or the GitHub API rate limit was reached.",
                    403
            );

        } catch (HttpServerErrorException e) {

            throw new GithubApiException(
                    "GitHub service is temporarily unavailable.",
                    503
            );

        } catch (ResourceAccessException e) {

            throw new GithubApiException(
                    "Unable to connect to GitHub. Please try again later.",
                    503
            );
        }


    }
}
