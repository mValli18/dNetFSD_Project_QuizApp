using QuizApp.Models.DTOs;

namespace QuizApp.Interfaces
{
    public interface ITokenServie
    {
        string? GetToken(UserDTO userDTO);

        public interface ITokenService
        {
            string GetToken(UserDTO user);
        }
    }
}
