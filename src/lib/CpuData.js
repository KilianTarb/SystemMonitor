/*
    Extra functions involving data that 
    is monitored.
*/
import os from "os";
import util from "os-utils";

export function GetPercentage() {
  util.cpuUsage(function(v) {
    return v;
  });
}