const express = require('express')

const classesController = require('./classes_controller')

const router = express.Router()

router.route('/')
    .get(classesController.GetAllClasses)
    .post(classesController.CreateClass)

router.route('/:id')
    .get(classesController.GetClassDetails)
    .patch(classesController.UpdateClass)
    .delete(classesController.DeleteClass)

router.route('/:id/students')
    .get(classesController.GetStudentsInClass)
    .post(classesController.AddStudentIntoClass)
    .patch(classesController.RemoveStudentFromClass)

router.route('/:id/instructors')
    .get(classesController.GetInstructorsInClass)
    .post(classesController.AddInstructorIntoClass)
    .patch(classesController.RemoveInstructorFromClass)

module.exports = router
