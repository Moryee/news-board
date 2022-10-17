#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
    sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py migrate


FREE=$(free -m);
echo "FREE: ${FREE}"
FREE_FINAL=$(echo "$FREE" | grep -F Mem:  | grep -o "[0-9]*" | grep -o -m1 "^[0-9]*")
echo "FREE_FINAL: ${FREE_FINAL}"
MEM_LIMIT=$(($FREE_FINAL-400))
echo "MEM_LIMIT: ${MEM_LIMIT}"
echo " - "

export MEMORY_LIMIT="${MEM_LIMIT:=3500}";

export NODE_OPTIONS="--max-old-space-size=${MEMORY_LIMIT}"
echo "NODE_OPTIONS: ${NODE_OPTIONS}"


exec "$@"
