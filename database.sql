CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"taskInfo" VARCHAR(150) NOT NULL,
"complete" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("taskInfo", "complete")
VALUES ('Do the dishes', false),
('Mow the lawn', false);