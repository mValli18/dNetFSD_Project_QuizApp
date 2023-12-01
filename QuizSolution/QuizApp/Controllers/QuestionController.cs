using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Services;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IQuizResultService _quizResultService;

        public QuestionsController(IQuestionService questionService, IQuizResultService quizResultService)
        {
            _questionService = questionService;
            _quizResultService = quizResultService;
        }
       // [Authorize(Roles = "Creator")]
        [HttpPost("add")]
        public IActionResult AddToQuiz(QuestionDTO questionDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _questionService.AddToQuiz(questionDTO);
                if (result)
                    return Ok(questionDTO);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        //[Authorize]
        [HttpPut("update/{quizId}/question/{questionId}")]
        public IActionResult UpdateQuestion(int quizId, int questionId, [FromBody] Questions updatedQuestion)
        {
            try
            {
                _questionService.UpdateQuestion(quizId, questionId, updatedQuestion);
                return Ok($"Question with ID {questionId} in Quiz with ID {quizId} updated successfully.");
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to update the question. {e.Message}");
            }
        }

       // [Authorize]
        [HttpGet("getAll")]
        public IActionResult GetAllQuestions()
        {
            string errorMessage = string.Empty;
            try
            {
                var questions = _questionService.GetAllQuestions();
                return Ok(questions);
            }
            catch (NoQuestionsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
       //[Authorize]
        [HttpGet("byquiz/{quizId}")]
        public ActionResult<IEnumerable<Questions>> GetQuestionsByQuizId(int quizId)
        {
            string errorMessage = string.Empty;
            try
            {
                var questions = _questionService.GetQuestionsByQuizId(quizId);

                return Ok(questions);
            }
            catch (NoQuestionsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return NotFound($"No questions found for Quiz ID {quizId}." + errorMessage);
        }

       // [Authorize(Roles = "Creator")]
        [HttpDelete("Remove")]
        public IActionResult RemoveFromQuiz(int quizid, int questionid)
        {
            var result = _questionService.RemoveFromQuiz(quizid, questionid);
            if (result)
                return Ok("Deleted Question Successfully");
            return BadRequest("Could not remove the Question from quiz");
        }


    }
}