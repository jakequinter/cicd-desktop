use reqwest::header::{ACCEPT, AUTHORIZATION, HeaderMap, HeaderValue, USER_AGENT};

use crate::models::{ApiResult, Url};

fn construct_headers(token: &str) -> HeaderMap {
    let mut headers = HeaderMap::new();
    let token = format!("Bearer {}", token);
    let authorization_header = HeaderValue::from_str(&token).expect("Invalid access token");
    headers.insert(
        ACCEPT,
        HeaderValue::from_static("application/vnd.github+json"),
    );
    headers.insert(USER_AGENT, HeaderValue::from_static("flowlog"));
    headers.insert(AUTHORIZATION, authorization_header);

    headers
}

pub fn get_request(url: Url, token: &str) -> ApiResult<String> {
    let url = url.value();
    let client = reqwest::blocking::Client::new();
    let response = client.get(url).headers(construct_headers(token)).send()?;
    let response_body = response.text()?;

    Ok(response_body)
}

