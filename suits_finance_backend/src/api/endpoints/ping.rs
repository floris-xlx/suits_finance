// imports
use actix_cors::{Cors, CorsMiddleware};
use actix_web::{get, post, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use serde_json::{json, Value};
use std::env::var;
use std::io::Result;
use supabase_rs::SupabaseClient;
use tracing::{debug, error, info, trace, warn};

// crate imports
use crate::colors;
use crate::api::returns::success::ok_with_message;
use crate::telemetry::audit_log::{AuditLog, AuditLogStatus};




#[get("/ping")]
pub async fn ping() -> impl Responder {
    info!("{}", colors::cyan("GET @ /ping"));

    // Create a new audit log entry
    let _ = AuditLog::new(
        "GET @ /ping",
        "/ping",
        AuditLogStatus::Success,
        "anonymous",
        "Ping endpoint was called",
    ).await;

    ok_with_message("pong")
}