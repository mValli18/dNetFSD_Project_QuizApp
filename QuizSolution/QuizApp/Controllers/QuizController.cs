/*using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;

namespace QuizApp.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class QuizController : ControllerBase
        {
            private readonly IQuizService _quizService;

            public QuizController(IQuizService quizService)
            {
                _quizService = quizService;
            }
            [HttpGet]
            public ActionResult Get()
            {
                string errorMessage = string.Empty;
                try
                {
                    var result = _quizService.GetQuizs();
                    return Ok(result);
                }
                catch (NoQuizsAvailableException e)
                {
                    errorMessage = e.Message;
                }
                return BadRequest(errorMessage);
            }
            [Authorize(Roles = "Creator")]
            [HttpPost]
            public ActionResult Create(Quiz quiz)
            {
                string errorMessage = string.Empty;
                try
                {
                    var result = _quizService.Add(quiz);
                    return Ok(result);
                }
                catch (Exception e)
                {
                    errorMessage = e.Message;
                }
                return BadRequest(errorMessage);
            }
        [HttpGet]
        [Route("GetById")]
        public ActionResult GetById(QuizDTO quizDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.GetQuizById(quizDTO.Id);
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpGet]
        [Route("GetByCategory")]
        public ActionResult GetByCategory(QuizDTO quizDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.GetQuizzesByCategoryAsync(quizDTO.Category);
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }

    }
    }
*/
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
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly IQuestionService _questionService;
        private readonly IQuizResultService _quizResultService;

        public QuizController(IQuizService quizService, IQuestionService questionService, IQuizResultService quizResultService)
        {
            _quizService = quizService;
            _questionService = questionService;
            _quizResultService = quizResultService;
        }
        [HttpGet]
        public ActionResult Get()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.GetQuizs();
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        //[Authorize(Roles = "Creator")]
        [HttpPost]
        public ActionResult Create(Quiz quiz)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.Add(quiz);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }

        [HttpGet("category/{category}")]
        public ActionResult<IList<QuizDTO>> GetQuizzesByCategory(string category)
        {
            try
            {
                var quizzes = _quizService.GetQuizzesByCategory(category);
                return Ok(quizzes);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to retrieve quizzes. {e.Message}");
            }
        }
        [Authorize]
        [HttpGet("quiz/{quizId}/questions")]
        public ActionResult<IEnumerable<QuestionDTO>> GetQuestionsForQuiz(int quizId)
        {
            try
            {
                var questions = _questionService.GetQuestionsByQuizId(quizId);
                return Ok(questions);
            }
            catch (NoQuestionsAvailableException e)
            {
                return NotFound($"No questions found for Quiz ID {quizId}. {e.Message}");
            }
        }
        [Authorize]
        [HttpPost("evaluate/{quizId}")]
        public ActionResult<QuizResultDTO> EvaluateAnswer(int quizId, [FromBody] AnswerDTO answerDTO)
        {
            try
            {
                // Fetch questions for the given quiz
                var questions = _questionService.GetQuestionsByQuizId(quizId);

                if (questions.Count == 0)
                {
                    return NotFound($"No questions found for Quiz ID {quizId}");
                }

                // Display the questions along with their real question IDs
                var questionsWithIds = questions.Select(q => new QuestionDTO
                {
                    QuestionId = q.QuestionId,
                    QuizId = q.QuizId,
                    QuestionTxt = q.QuestionTxt,
                    Option1 = q.Option1,
                    Option2 = q.Option2,
                    Option3 = q.Option3,
                    Option4 = q.Option4,
                }).ToList();

                // Log or return the questions to the user (this depends on frontend implementation)

                // evaluating the answers
                var result = _quizResultService.EvaluateAnswer(quizId, answerDTO);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to evaluate the answer. {e.Message}");
            }
        }

        [Authorize]
        [HttpGet("leaderboard/{quizId}")]
        public ActionResult<IEnumerable<LeaderboardEntryDTO>> GetLeaderboard(int quizId)
        {
            var leaderboard = _quizResultService.GetLeaderboard(quizId);

            if (leaderboard == null || !leaderboard.Any())
            {
                return NotFound($"No leaderboard found for Quiz ID {quizId}");
            }

            return Ok(leaderboard);
        }
        [Authorize(Roles = "Creator")]
        [HttpDelete("{quizId}")]
        public IActionResult DeleteQuiz(int quizId)
        {
            try
            {
                var deleted = _quizService.DeleteQuizIfNoQuestions(quizId);

                if (deleted)
                {
                    return Ok($"Quiz with ID {quizId} deleted successfully.");
                }

                return BadRequest($"Cannot delete the quiz with ID {quizId} as it has questions associated with it.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Authorize]
        [HttpPut("{quizId}")]
        public IActionResult UpdateQuiz(int quizId, [FromBody] Quiz updatedQuiz)
        {
            try
            {
                // Validate if the provided quizId matches the quizId in the updatedQuiz
                if (quizId != updatedQuiz.QuizId)
                {
                    return BadRequest("Mismatched quizId in the request.");
                }

                // Get the existing quiz from the service
                var existingQuiz = _quizService.GetQuizById(quizId);

                // Check if the quiz exists
                if (existingQuiz == null)
                {
                    return NotFound($"Quiz with ID {quizId} not found.");
                }

                // Update the properties of the existing quiz with the values from the updatedQuiz
                existingQuiz.Title = updatedQuiz.Title;
                existingQuiz.Description = updatedQuiz.Description;
                //existingQuiz.TimeLimit = updatedQuiz.TimeLimit;

                // Update the quiz in the service
                _quizService.UpdateQuiz(existingQuiz);

                return Ok("Quiz updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
