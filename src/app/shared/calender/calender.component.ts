//Component which is used to display custom calender.
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnChanges {
  /**
   * Variable which is used to store start date.
   */
  @Input() startDate!: boolean
  /**
   * Variable which is used to store end date.
   */
  @Input() endDate!: boolean
  /**
   * Variable which is used to store date which is selected in start date calendar.
   */
  @Input() activeDate: any = null;
  /**
   * Variable which is used to store date which is selected in end date calendar.
   */
  @Input() activeEndDate: any = null;
  /**
   * Variable which is used to emit start selected date.
   */
  @Output() startDateOutput = new EventEmitter();
  /**
   * Variable which is used to emit end selected date.
   */
  @Output() endDateOutput = new EventEmitter();
  /**
   * Variable which is used to get reference of mat calendar.
   */
  @ViewChild('calendar', { static: false })
  calendar!: MatCalendar<Date>;
  /**
   * Variable which is used to store selected date.
   */
  selectedDate: Date = new Date();

  @Input() validationDate = new Date();

  /**
   * Component life cycle hook which detects changes.
   */
  ngOnChanges(): void {
    console.log(this.validationDate);
    //To check a date is selected in start calendar or end date calendar.
    if (this.endDate && this.activeEndDate) {
      this.selectedDate = this.activeEndDate
    } else if (this.startDate && this.activeDate) {
      this.selectedDate = this.activeDate
    }
    if (this.selectedDate && this.calendar)
      this.calendar.activeDate = this.selectedDate;
    this.validationDate = new Date('2024-09-25T00:00:00+05:30')
  }
  /**
   * Method which is used to select today's date.
   */
  selectToday(): void {
    this.selectedDate = new Date();
    this.calendar.activeDate = this.selectedDate;
    this.onFindDateSelected(this.selectedDate);

  }
  /**
   * Method which is used to select next monday.
   */
  selectNextMonday(): void {
    this.selectedDate = this.getNextWeekday(1);
    this.calendar.activeDate = this.selectedDate;
    this.startDateOutput.emit(this.selectedDate);
  }
  /**
   * Method which is used to select next tuesday.
   */
  selectNextTuesday(): void {
    this.selectedDate = this.getNextWeekday(2);
    this.calendar.activeDate = this.selectedDate;
    this.startDateOutput.emit(this.selectedDate);
  }
  /**
   * Method which is used to select date after one week.
   */
  selectAfterOneWeek(): void {
    let today = new Date();
    this.selectedDate = new Date(today.setDate(today.getDate() + 7));
    this.calendar.activeDate = this.selectedDate;
    this.startDateOutput.emit(this.selectedDate);
  }
  /**
   * Method which is used to find the next week day.
   * @param day which holds the day value.
   * @returns date after finding the week day.
   */
  getNextWeekday(day: number): Date {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + ((7 + day - today.getDay()) % 7 || 7));
    return date;
  }
  /**
   * Method which is used to find last day of a month when selecting No Date button.
   */
  selectLastDayOFCurrentMonth(): void {
    this.selectedDate = new Date();
    const today = new Date();
    this.selectedDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.calendar.activeDate = this.selectedDate;
    this.endDateOutput.emit(this.selectedDate);
  }
  /**
   * Method which is used to get the date selected from the date picker
   * @param event which holds the selected date.
   */
  onDateSelected(event: any): void {
    this.selectedDate = event;
    this.onFindDateSelected(event);
  }
  /**
   * Method which is used to emit the start and end dates selected.
   * @param data which holds the selected date.
   */
  onFindDateSelected(data: any): void {
    if (this.endDate) {
      this.endDateOutput.emit(data);
    } else {
      this.startDateOutput.emit(data);
    }
  }

}
