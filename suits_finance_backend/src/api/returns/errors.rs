//! This module provides various HTTP response helpers for error messages.

use actix_web::{HttpResponse, Responder};
use serde_json::{json, Value};


/// Respond with unauthorized message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "error" and message "Unauthorized"
///
/// # Examples
///
/// ```
/// let response = unauthorized();
/// ```
pub fn unauthorized() -> impl Responder {
    HttpResponse::Unauthorized().json(json!({
        "status": "error",
        "message": "Unauthorized"
    }))
}

/// Respond with a not found message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "error" and message "Not Found"
///
/// # Examples
///
/// ```
/// let response = not_found();
/// ```
pub fn not_found() -> impl Responder {
    HttpResponse::NotFound().json(json!({
        "status": "error",
        "message": "Not Found"
    }))
}

/// Respond with a bad request message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "error" and message "Bad Request"
///
/// # Examples
///
/// ```
/// let response = bad_request();
/// ```
pub fn bad_request() -> impl Responder {
    HttpResponse::BadRequest().json(json!({
        "status": "error",
        "message": "Bad Request"
    }))
}

/// Respond with a server error message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "error" and message "Internal Server Error"
///
/// # Examples
///
/// ```
/// let response = server_error();
/// ```
pub fn server_error() -> impl Responder {
    HttpResponse::InternalServerError().json(json!({
        "status": "error",
        "message": "Internal Server Error"
    }))
}

/// Respond with a service unavailable message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "error" and message "Service Unavailable"
///
/// # Examples
///
/// ```
/// let response = service_unavailable();
/// ```
pub fn service_unavailable() -> impl Responder {
    HttpResponse::ServiceUnavailable().json(json!({
        "status": "error",
        "message": "Service Unavailable"
    }))
}

/// Respond with a 208 message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "error" and message "Already Reported"
///
/// # Examples
///
/// ```
/// let response = already_reported();
/// ```
pub fn already_reported() -> impl Responder {
    HttpResponse::AlreadyReported().json(json!({
        "status": "error",
        "message": "Already Reported"
    }))
}

/// Respond with a custom error message
///
/// # Arguments
///
/// * `status` - A string slice that holds the error status
/// * `message` - A string slice that holds the error message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with the provided status and message
///
/// # Examples
///
/// ```
/// let response = custom_error("error", "Custom error message");
/// ```
pub fn custom_error(status: &str, message: &str) -> impl Responder {
    match status.parse::<u16>() {
        Ok(code) => match actix_web::http::StatusCode::from_u16(code) {
            Ok(status_code) => HttpResponse::build(status_code).json(json!({
                "status": "error",
                "message": message
            })),
            Err(_) => HttpResponse::InternalServerError().json(json!({
                "status": "error",
                "message": "Invalid status code"
            })),
        },
        Err(_) => HttpResponse::InternalServerError().json(json!({
            "status": "error",
            "message": "Invalid status code"
        })),
    }
}
