export function getTodayFullDateTime() {
    const today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let monthString = "";
    month == 1 ? monthString = "January" :
        month == 2 ? monthString = "Febrary" :
            month == 3 ? monthString = "March" :
                month == 4 ? monthString = "April" :
                    month == 5 ? monthString = "May" :
                        month == 6 ? monthString = "June" :
                            month == 7 ? monthString = "July" :
                                month == 8 ? monthString = "August" :
                                    month == 9 ? monthString = "September" :
                                        month == 10 ? monthString = "October" :
                                            month == 11 ? monthString = "Nobember" :
                                                month == 12 ? monthString = "December" : monthString = "January";
    return {
        date: date + " " + monthString + " " + year,
        time: hour + ":" + min
    };
}
