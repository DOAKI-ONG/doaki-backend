echo "⏳ Aguardando o banco de dados ficar disponível..."
until pg_isready -h postgres -p 5432 -U postgres; do
  sleep 3
done
echo "✅ Banco de dados disponível!"

echo "🔄 Executando as migrações..."
npx prisma migrate dev

echo "🔄 Sincronizando o banco de dados..."
npx prisma generate

echo "🚀 Iniciando o servidor..."
exec npx tsx watch src/server.ts
