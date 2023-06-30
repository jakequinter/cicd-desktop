use std::fmt::{Display, Formatter};
use reqwest::StatusCode;

#[derive(Debug)]
pub struct TauriError {
    pub message: &'static str,
}

impl From<reqwest::Error> for TauriError {
    fn from(error: reqwest::Error) -> Self {
        let error_message = match error.status().unwrap() {
            StatusCode::FORBIDDEN => "This endpoint requires a GitHub access token",
            StatusCode::BAD_REQUEST => "There was a problem with your request",
            _ => "Something went wrong handling this request"
        };
        TauriError {
            message: error_message
        }
    }
}

impl serde::Serialize for TauriError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

impl Display for TauriError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.message)
    }
}

// #[derive(Debug)]
// pub struct CustomError {
//     pub message: &'static str,
// }
//
// impl From<rspc::Error> for CustomError {
//     fn from(error: rspc::Error) -> Self {
//         let error_message = match error.status().unwrap() {
//             ErrorCode::Timeout => "This endpoint requires a GitHub access token",
//             _ => "Something went wrong handling this request"
//         };
//         CustomError {
//             message: error_message
//         }
//     }
// }
//
// impl serde::Serialize for CustomError {
//     fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
//         where
//             S: serde::ser::Serializer,
//     {
//         serializer.serialize_str(self.to_string().as_ref())
//     }
// }
//
// impl Display for CustomError {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         f.write_str(&self.message)
//     }
// }
