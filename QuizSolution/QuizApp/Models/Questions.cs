using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.Models
{
    public class Questions
    {
        [Key]
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public int QuizId { get; set; }
        public ICollection<Option> Option { get; set; }

    }
}
