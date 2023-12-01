using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models
{
    public class LeaderBoardEntry
    {
        [Key]
        public int LeaderboardId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        public int Score { get; set; }
    }
}
