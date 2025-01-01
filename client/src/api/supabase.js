import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jkhqdwrkekeslxwtprki.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraHFkd3JrZWtlc2x4d3RwcmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMDQ5NTcsImV4cCI6MjAxOTg4MDk1N30.ZLfX-eVcgjmx1pARhuHB9l1eJofe_ZkTOMxcIxyDezI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
