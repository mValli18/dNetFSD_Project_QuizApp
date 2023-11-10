namespace QuizApp.Exceptions
{
    public class NoQuizsAvailableException : Exception
    {
        string message;
        public NoQuizsAvailableException()
        {
            message = "No products are available for sale";
        }
        public override string Message => message;
    }
}
