import {Student} from './student';
import {Formation} from "./formation";
import {Graduation} from "./graduation";

describe('Student', () => {
  it('should create an instance', () => {
    expect(new Student('', '', '', Formation.MMI, Graduation["BAC+3"], 0, false, false, '', '')).toBeTruthy();
  });
});
