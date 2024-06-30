#!/bin/sh
echo -e "\nUpserting Scylla CDC Source Connector ⏳"
PREFIX=$(echo local | awk -F"-" '{for(i=2;i<=NF;i++){$i=substr($i,1)}} 1' OFS="_")
echo -e "\nUsing prefix: ${PREFIX}"
curl -X "PUT" "http://kafka-connect:8083/connectors/scylla-cdc-source/config" \
     -H "Content-Type: application/json" \
     -d "{
             \"name\":\"scylla-cdc-source\",
             \"connector.class\":\"com.scylladb.cdc.debezium.connector.ScyllaConnector\",
             \"key.converter\":\"org.apache.kafka.connect.json.JsonConverter\",
             \"value.converter\":\"org.apache.kafka.connect.json.JsonConverter\",
             \"scylla.cluster.ip.addresses\":\"scylla-db:9042\",
             \"scylla.name\":\"test_cluster\",
             \"scylla.table.names\":\"event_keyspase.events\",
             \"auto.create.topics.enable\": \"true\",
             \"scylla.consistency.level\": \"ONE\",
             \"topic.creation.default.replication.factor\": \"1\",
             \"topic.creation.default.partitions\": \"5\",
             \"scylla.query.time.window.size\": \"1000\",
             \"scylla.confidence.window.size\": \"1000\"
         }"\
      --verbose
