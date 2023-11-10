using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.Models
{
    public class Quiz
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title of the Quiz cannot be empty")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int? TimeLimit { get; set; }

        [ForeignKey("CreatorId")]
        public int? CreatorId { get; set; }

        public int? QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public ICollection<Questions>? Questions { get; set; }
    }
}
