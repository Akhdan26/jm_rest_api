SELECT
    e.id,
    e.nik,
    e.name,
    e.Is_active,
    ep.gender,
    CONCAT(DATE_PART('year', AGE(ep.date_of_birth)), ' years old') AS age,
    ed.name AS school_name,
    ed.level,
    CASE
        WHEN ef_counts IS NULL THEN ''
        ELSE ef_counts
    END AS family_data
FROM
    employees AS e
LEFT JOIN
    employee_profiles AS ep ON e.id = ep.employee_id
LEFT JOIN
    educations AS ed ON e.id = ed.employee_id
LEFT JOIN (
    SELECT
        employee_id,
        STRING_AGG(
            CONCAT(total_family_members,' ', relation_status),
            ' & '
        ) AS ef_counts
    FROM (
        SELECT
            employee_id,
            relation_status,
            COUNT(*) AS total_family_members
        FROM
            employee_families
        GROUP BY
            employee_id, relation_status
    ) AS subquery
    GROUP BY
        employee_id
) AS ef ON e.id = ef.employee_id;