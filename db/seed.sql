INSERT INTO department (name)
VALUES ('Legal'),
    ('Sales'),
    ('Engineering');
INSERT INTO roles (title, salary, department_id)
VALUES ('Legal Team Lead', 150000, 1),
    ('Lawyer', 100000, 1),
    ('Sales Lead', 75000, 2),
    ('Salesperson', 50000, 2),
    ('Lead Engineer', 150000, 3),
    ('Engineer', 100000, 3);
INSERT INTO employee (
        first_name,
        last_name,
        role_id,
        manager_id,
        manager_confirm
    )
VALUES ('Ivana', 'Poe', 1, null, true),
    ('Bailey', 'Poe', 2, 1, false),
    ('Arjuna', 'Gallego', 2, 1, false),
    ('Chaggit', 'Hull', 3, null, true),
    ('Ain', 'Simonsen', 4, 2, false),
    ('Selina', "O'Reilly", 4, 2, false),
    ('Wilburg', 'Piazza', 4, 2, false),
    ('Ville', 'Gupta', 5, null, true),
    ('Adrian', 'Strickland', 6, 3, false),
    ('Carla', 'Solomon', 6, 3, false);
INSERT INTO manager (first_name, last_name)
SELECT first_name,
    last_name
FROM employee
WHERE manager_confirm = 1;