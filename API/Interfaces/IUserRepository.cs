using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByNameAsync(string username);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<bool> SaveAllAsync();
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string name);

    }
}