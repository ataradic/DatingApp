using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob){
            var today=DateTime.Now;
            var age=today.Year-dob.Year;
            if(dob.Date>today.AddYears(-age))age--;
            return age;
        }
        }
}