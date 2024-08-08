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

// endpoint imports
use crate::api::endpoints::ping::ping;





pub async fn api_client() -> Result<()> {
    info!("{}", colors::cyan("Starting the API client.."));

    let port: u16 = var("API_PORT")
        .unwrap_or("9001".to_string())
        .parse()
        .unwrap_or(9001);

    info!(
        "{}",
        colors::cyan(&format!("Binding the API client on port: {}", port))
    );

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new().wrap(cors).service(ping)
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}
