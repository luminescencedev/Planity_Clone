    export default function TimePicker({ selectedTime, setSelectedTime }) {
        const times = [
        "09:00", "09:30", "10:00", "10:30", "11:00",
        "11:30", "12:00", "13:00", "13:30", "14:00",
        "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
        ];
    
        return (
        <div>
            <label>Choisissez un horaire :</label>
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {times.map((time, index) => (
                <option key={index} value={time}>
                {time}
                </option>
            ))}
            </select>
        </div>
        );
    }
    