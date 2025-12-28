import React, { useEffect, useState, useRef  } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { styles } from '@/styles/components/CalendarStyle';


interface Mission {
  id: string;
  title: string;
  datetime: string; // ex: "2025-12-28T14:00:00Z"
}

// MOCK DATA **********************
const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Promenade de chiens',
    datetime: '2025-12-28T09:00:00',
  },
  {
    id: '2',
    title: 'Nettoyage du refuge',
    datetime: '2025-12-28T14:00:00',
  },
  {
    id: '3',
    title: 'Distribution de nourriture',
    datetime: '2025-12-30T10:30:00',
  },
];

// *********************

const weekDays = ['D', 'L', 'M', 'Me', 'J', 'V', 'S'];
const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};




/**
 * Calendar component that displays a monthly view with selectable days.
 *
 * - By default, the current day is selected on first render and its missions are loaded.
 * - Users can navigate between months using previous/next arrows.
 * - When the month changes, the selected day automatically resets to the first day of that month.
 * - Selecting a day loads and displays all missions scheduled for that specific date.
 *
 * Missions are filtered by date.
 * The time portion of the datetime is extracted and displayed separately in the missions list.
 */
export default function Calendar() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isFirstRender = useRef(true);


  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [missionsToday, setMissionsToday] = useState<Mission[]>([]);
  const [noEventsMessage, setNoEventsMessage] = useState(false);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loadMissionsForDay(selectedDay);
            return;
        }
        const updatedDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            1
        );

        setSelectedDay(updatedDate);
        loadMissionsForDay(updatedDate);
    }, [currentMonth]);




  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const getDateKeyFromDatetime = (datetime: string) => {
    const d = new Date(datetime);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD
  };

    const getTimeFromDatetime = (datetime: string) => {
    const d = new Date(datetime);
    return d.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const changeMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };



//   const missionsForSelectedDay: Mission[] = useMemo(() => {
//     const key = formatDateKey(selectedDay);
//     return mockMissionsByDate[key] ?? [];
//   }, [selectedDay]);

  const isToday = (dayNum: number) => {
    const today = new Date();
    return (
      dayNum === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (dayNum: number) =>
    dayNum === selectedDay.getDate() &&
    currentMonth.getMonth() === selectedDay.getMonth() &&
    currentMonth.getFullYear() === selectedDay.getFullYear();

  const handleDayPress = (dayNum: number) => {
    if (dayNum <= 0 || dayNum > daysInMonth) return;

    const clickedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        dayNum
    );

    setSelectedDay(clickedDate);
    loadMissionsForDay(clickedDate);
  };


  const loadMissionsForDay = async (date: Date) => {
    setNoEventsMessage(false);

    const selectedKey = formatDateKey(date);

    try {
        // futur : await fetchMissionsForDate(date)
        const missions = mockMissions.filter(
        (mission) =>
            getDateKeyFromDatetime(mission.datetime) === selectedKey
        );

        if (missions.length === 0) {
        setNoEventsMessage(true);
        setMissionsToday([]);
        } else {
        setMissionsToday(missions);
        }
    } catch (error) {
        setNoEventsMessage(true);
        setMissionsToday([]);
    }
  };



  return (
    <View style={styles.calendar}>
      {/* Header */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => changeMonth('prev')}>
            <Text style={styles.monthArrow}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.calendarMonth}>
            {monthNames[currentMonth.getMonth()]}
        </Text>

        <TouchableOpacity onPress={() => changeMonth('next')}>
            <Text style={styles.monthArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>


      {/* Week days */}
      <View style={styles.calendarWeekDays}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.calendarDays}>
        {Array.from({ length: 35 }, (_, i) => {
          const dayNum = i - firstDayOfMonth + 1;
          const isValid = dayNum > 0 && dayNum <= daysInMonth;

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.calendarDay,
                !isValid && styles.calendarDayEmpty,
                isToday(dayNum) && styles.calendarDayToday,
                isSelected(dayNum) && styles.calendarDaySelected,
              ]}
              onPress={() => handleDayPress(dayNum)}
              disabled={!isValid}
            >
              <Text style={styles.calendarDayText}>
                {isValid ? dayNum : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Missions */}
      <View style={styles.missionsSection}>
        {noEventsMessage ? (
            <Text style={styles.noEventsText}>
            Pas de choses prévues ce jour
            </Text>
        ) : (
            missionsToday.map((mission) => (
            <View key={mission.id} style={styles.missionItem}>
                <Text style={styles.missionTime}>
                {getTimeFromDatetime(mission.datetime)}
                </Text>
                <Text style={styles.missionTitle}>
                {mission.title}
                </Text>
            </View>
            ))
        )}
      </View>
    </View>
  );
}
