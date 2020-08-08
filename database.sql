CREATE TABLE "tasks" (
"task" VARCHAR(100) NOT NULL,
"complete" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("task", "complete")
VALUES ('Do the dishes', false),
('Mow the lawn', false);