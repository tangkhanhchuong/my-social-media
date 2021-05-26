const { HttpStatus } = require("../Http/index")
const instructorsServices = require("./instructors_services")
const db = require('../Database/postgres_connector')

const GetInstructors = async (req, res) => {
    const instructors = await instructorsServices.GetInstructors()
    HttpStatus.ok(res, {
        count: instructors.length,
        instructors,
    })
}

const GetInstructorDetails = async (req, res) => {
    const instructorId = req.params.id

    const [instructor] = await db('instructors as i')
        .join('personal_information as p', 'p.info_id', 'i.info_id')
        .where('i.instructor_id', instructorId)
        .select()

    const participatedClasses = await db('instructor_class as ic')
        .join('instructors as i', 'i.instructor_id', 'ic.instructor_id')
        .join('classes as c', 'c.class_id', 'ic.class_id')
        .where('ic.instructor_id', instructorId)
        .select('c.class_id', 'c.course_id', 'c.schedule', 'c.time_slot', 'c.duration')

    HttpStatus.ok(res, {
        instructor: { ...instructor, participatedClasses }
    })
}

const CreateInstructor = async (req, res) => {
    const { name, gender, dob, phone, email, address, avatar_url } = req.body

    const info_id = Math.random().toString().split('.')[1].slice(0, 3) + Date.now().toString().slice(0, 3)

    const [newInfo] = await db('personal_information')
        .insert({
            info_id, name, gender, dob, phone, email, address, avatar_url
        })
        .returning('*')

    const instructor_id = 'INS' + Math.random().toString().split('.')[1].slice(0, 5)

    const [newStudent] = await db('instructors')
        .insert({
            info_id, instructor_id, is_working: true, start_working_at: new Date(Date.now())
        })
        .returning('*')

    HttpStatus.created(res, {
        new_instructor: {
            name: newInfo.name,
            new_instructor: newStudent.instructor_id
        }
    })
}

const EditInstructor = async (req, res) => {
    const instructorId = req.params.id

    const { name, gender, dob, phone, email, address, avatar_url, is_working } = req.body

    const [updatedInstructor] = await db('instructors')
        .where('instructor_id', '=', instructorId)
        .update({ is_working })
        .returning('*')

    const info_id = updatedInstructor.info_id

    const [updatedInstructorInfo] = await db('personal_information')
        .where('info_id', '=', info_id)
        .update({ name, gender, dob, phone, email, address, avatar_url })
        .returning('*')

    HttpStatus.created(res, {
        updated_instructor: { ...updatedInstructor, ...updatedInstructorInfo }
    })
}

const RemoveInstructor = (req, res) => {

}

module.exports = {
    GetInstructors,
    GetInstructorDetails,
    CreateInstructor,
    RemoveInstructor,
    EditInstructor
}

