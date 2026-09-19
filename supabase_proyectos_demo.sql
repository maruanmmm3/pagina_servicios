-- Credenciales de demostración para proyectos del portafolio
alter table "SP_projects"
  add column if not exists demo_user text,
  add column if not exists demo_password text,
  add column if not exists demo_email text;
