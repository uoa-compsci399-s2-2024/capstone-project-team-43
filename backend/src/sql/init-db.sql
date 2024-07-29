DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT,
    description TEXT
);

INSERT INTO Projects (name, description) VALUES 
    ('Project 1', 'example desc'),
    ('Project 2', 'example desc 2');


