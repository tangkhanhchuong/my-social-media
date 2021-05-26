exports.up = function (knex) {
    return knex.schema.createTable('courses', (table) => {
        table.string('course_id').notNullable().unique()
        table.string('name').notNullable()
        table.integer('fee').notNullable()
        table.string('description')
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('courses')
}