echo "⏳ Aguardando o banco de dados ficar disponível..."
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "❌ Banco de dados ainda não está disponível. Tentando novamente em 1 segundos..."
  sleep 1
done
echo "✅ Banco de dados disponível!"

echo "🔄 Sincronizando o banco de dados..."
if ! npx prisma generate; then
  echo "❌ Falha ao sincronizar o banco de dados."
  exit 1
fi

echo "🔄 Executando as migrações..."
if ! npx prisma migrate deploy; then
  echo "❌ Falha ao executar as migrações."
  exit 1
fi

echo "🌱 Rodando seed..."
if ! npx prisma db seed; then
  echo "❌ Falha ao rodar seed."
  exit 1
fi

echo "🚀 Iniciando o servidor..."
exec npx tsx watch src/server.ts