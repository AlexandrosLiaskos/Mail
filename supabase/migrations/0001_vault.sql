-- 0001_vault.sql
-- Enable the Supabase Vault for storing the UoA IMAP/SMTP password.
-- Vault encrypts at rest with a server-side key; only SECURITY DEFINER
-- functions in this schema can read decrypted_secret.

create extension if not exists "supabase_vault" with schema "vault";
