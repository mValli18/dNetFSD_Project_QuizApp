using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.Models
{
    public class QuizState
    {
        [Key]
        public int QuizStateId { get; set; }
        [ForeignKey("QuizId")]
        public int QuizId { get; set; }
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        [ForeignKey("QuestionId")]
        public int QuestionId { get; set; }
        public int LastQuestionIndex { get; set; }

    }
}