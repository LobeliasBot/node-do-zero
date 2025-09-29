import sql from './db.js'

async function main() {
  await sql`
    create table if not exists videos (
      id bigserial primary key,
      title text,
      description text,
      duration integer
    )
  `
  console.log('✅ Tabela criada com sucesso!')
  await sql.end()
}

main().catch(err => console.error('❌ Erro:', err))