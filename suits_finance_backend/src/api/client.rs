// imports
use supabase_rs::SupabaseClient;
use tracing::{info, error, warn, debug, trace};
use dotenv::dotenv;
use std::env::var;
use actix_cors::{Cors, CorsMiddleware};
use actix_web::{get, post, App, HttpResponse, HttpServer, Responder};
use serde_json::{json, Value};


// crate imports
use crate::colors;


#[get("/ping")]
async fn version() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "build": 10
    }))
}



pub async fn api_client() {
    info!("{}", colors::cyan("Starting the API client.."));
}