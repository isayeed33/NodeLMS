var express = require('express');
var router = express.Router();

var Class = require('../models/class');
var Response = require('../response');


//List Class Table Data
router.get('/display', function(req, res) {
    Class.find(function(err, classes) {
        if (err) {
            console.log(err);
        } else {
            res.render('classes/display-table', { classes: classes });
            console.log(classes);
        }
    });
});

//Display Classes 
router.get('/add', function(req, res, next) {
    res.render('classes/add-form');
});

/* POST Class. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor
    }
    var data = Class(mybodydata);
    data.save(function(err) {
        if (err) {
            res.render('classes/add-form', { message: 'Class not added successfully!' });
        } else {
            res.render('classes/add-form', { message: 'Class Added successfully!' });
        }
    })
});

/* DELETE Class BY ID */
router.get('/delete/:id', function(req, res) {
    Class.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {

            req.flash('error_msg', 'Class Not Deleted');
            res.redirect('../display');
        } else {

            req.flash('success_msg', 'Class Deleted');
            res.redirect('../display');
        }
    });
});


/* GET SINGLE Class BY ID */
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    Class.findById(req.params.id, function(err, classes) {
        if (err) {
            console.log(err);
        } else {
            console.log(classes);
            res.render('classes/edit-form', { classDetail: classes });
        }
    });
});

/* UPDATE Class */
router.post('/edit/:id', function(req, res) {
    Class.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
            req.flash('error_msg', 'Something went wrong! User could not updated.');
            res.redirect('edit/' + req.params.id);
        } else {
            req.flash('success_msg', 'Class Updated');
            res.redirect('../display');
        }
    });
});


// router.get('/get-all-users-api', function(req, res, next) {
//     Class.find({}, function(err, posts) {
//         if (err) {
//             Response.errorResponse(err, res);
//         } else {
//             Response.successResponse('User Listing!', res, posts);
//         }
//     });

// });

// router.post('/add-users-api', function(req, res, next) {
//     console.log(req.body);

//     const mybodydata = {
//         title: req.body.title,
//         description: req.body.description,
//         instructor: req.body.instructor
//     }
//     var data = Class(mybodydata);
//     //var data = Class(req.body);
//     data.save(function(err) {
//         if (err) {
//             Response.errorResponse(err, res);
           
//         } else {

//             Response.successResponse('Class Added!', res, {});
//         }
//     })
// });


// /* GET SINGLE POST BY ID */
// router.get('/get-users-details-api/:id', function(req, res, next) {
//     Class.findById(req.params.id, function (err, post) {
//     if(err){
//       Response.errorResponse(err,res);
//   }else{
//       Response.successResponse('Class Detail!',res,post);
//   }
//   });
// });

// /* DELETE POST BY ID */
// router.delete('/delete-users-api', function(req, res, next) {
//     Class.findByIdAndRemove(req.body._id, function (err, post) {
//     if (err) {
//       Response.errorResponse(err,res);
//     } else {
//       Response.successResponse('Class deleted!',res,{});
//     }
//   });
// });

// /* UPDATE POST */
// router.post('/update-users-api', function(req, res, next) {
//   console.log(req.body._id);
//   Class.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
//   if (err) {
//     Response.errorResponse(err,res);
//   } else {
//     Response.successResponse('Class updated!',res,{});
//   }
// });
// });

// module.exports = router;


//Classes Page
router.get('/', function(req, res, next) {
	Class.getClasses(function(err, classes){
		if(err) throw err;
		res.render('classes/index', { classes: classes });
	},3);
});

// Class Details
router.get('/:id/details', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		if(err) throw err;
		res.render('classes/details', { class: classname });
	});
});

// Get Lessons
router.get('/:id/lessons', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		if(err) throw err;
		res.render('classes/lessons', { class: classname });
	});
});

// Get Lesson
router.get('/:id/lessons/:lesson_id', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		var lesson;
		if(err) throw err;
		for(i=0;i<classname.lessons.length;i++){
			if(classname.lessons[i].lesson_number == req.params.lesson_id){
				lesson = classname.lessons[i];
			}
		}
		res.render('classes/lesson', { class: classname,lesson: lesson });
	});
});




module.exports = router;
