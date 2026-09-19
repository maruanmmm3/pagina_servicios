-- Ejecutar una vez en el SQL Editor de Supabase
alter table "SP_services"
  add column if not exists price_min numeric,
  add column if not exists price_max numeric,
  add column if not exists negotiable boolean not null default false;

-- Precios referenciales del mercado peruano (freelance / pequeña agencia), en soles.
-- Todos marcados como negociables; ajústalos desde Admin > Servicios.
update "SP_services" set price_min = 300,  price_max = 900,  negotiable = true where title = 'Landing Pages';
update "SP_services" set price_min = 800,  price_max = 2500, negotiable = true where title = 'Páginas Web Empresariales';
update "SP_services" set price_min = 2500, price_max = 8000, negotiable = true where title = 'Sistemas de Administración';
update "SP_services" set price_min = 3000, price_max = 9000, negotiable = true where title = 'Sistemas de Facturación';
update "SP_services" set price_min = 150,  price_max = 800,  negotiable = true where title = 'Automatización de Excel';
update "SP_services" set price_min = 500,  price_max = 3000, negotiable = true where title = 'Automatización de procesos empresariales';
