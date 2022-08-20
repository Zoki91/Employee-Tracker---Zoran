INSERT INTO department (name)
VALUES ('Sales'),
       ('Legal'),
       ('Finance'),
       ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 180000, 1),
       ('Lawyer', 250000, 2),
       ('Financial Analyst', 220000, 3),
       ('Lead Engineer', 150000, 4),
       ('Accountant', 100000, 5),
       ('Paralegal', 85000, 2),
       ('Engineer', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Zoran', 'Mitrevski', 1, 1),
       ('Archie', 'Mitrevski', 2, 1),
       ('Melissa', 'Mitrevski', 3, 2),
       ('Robert', 'Maxwell', 4, null),
       ('Karami', 'Merhi', 5, null),
       ('Matthew', 'Trewaves', 6, 5),
       ('Kelly', 'Norman', 2, null);
