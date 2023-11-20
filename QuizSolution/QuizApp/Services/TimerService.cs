public class TimerService
{
    private Timer _timer;

    public event Action<int> TimerElapsed; // Event to notify when the timer elapses

    public void StartTimer(int quizId, int? durationSeconds)
    {
        // Calculate end time
        DateTime endTime = DateTime.Now.AddSeconds((double)durationSeconds);

        // Set up timer
        _timer = new Timer(state => TimerElapsed?.Invoke(quizId), null, 0, 1000);
        _timer.Change(0, 1000);
    }

    public void StopTimer()
    {
        _timer?.Dispose();
    }
}