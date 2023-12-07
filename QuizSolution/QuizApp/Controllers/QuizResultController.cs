using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using System;
using System.Collections.Generic;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class QuizResultController : ControllerBase
    {
        private readonly IQuizResultService _quizResultService;

        public QuizResultController(IQuizResultService quizResultService)
        {
            _quizResultService = quizResultService;
        }
        [Authorize]
        [HttpGet("byQuiz/{quizId}")]
        public ActionResult<IEnumerable<QuizResultDTO>> GetResultsByQuiz(int quizId)
        {
            try
            {
                var results = _quizResultService.GetResultsByQuiz(quizId);

                return Ok(results);
            }
            catch (NoQuizResultsAvailableException e)
            {
                return NotFound($"No quiz results found for Quiz ID {quizId}. {e.Message}");
            }
        }
        [Authorize]
        [HttpGet("results-with-total-score/{username}/{quizId}")]
        public ActionResult<QuizResultsWithTotalScoreDTO> GetResultsWithTotalScoreByUserAndQuiz(string username, int quizId)
        {
            try
            {
                var results = _quizResultService.GetResultsByUserAndQuiz(username, quizId);
                var totalScore = _quizResultService.GetTotalScoreForUserInQuiz(quizId, username);

                var resultsWithTotalScoreDTO = new QuizResultsWithTotalScoreDTO
                {
                    TotalScore = totalScore,
                    QuizResults = results
                };

                return Ok(resultsWithTotalScoreDTO);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to retrieve quiz results with total score. {e.Message}");
            }
        }

        [Authorize]
        [HttpGet("totalscore/{quizId}/{username}")]
        public ActionResult<int> GetTotalScoreForUserInQuiz(int quizId, string username)
        {
            try
            {
                var totalScore = _quizResultService.GetTotalScoreForUserInQuiz(quizId, username);
                return Ok("The Total Score is:" + totalScore);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to get total score. {e.Message}");
            }
        }

    }
}