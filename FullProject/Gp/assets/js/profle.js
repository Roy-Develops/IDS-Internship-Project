document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profile-link');
    const profileModal = document.getElementById('profile-modal');
    const profileInfo = document.getElementById('profile-info');
    const closeModal = document.getElementsByClassName('close')[0];
  
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const memberId = localStorage.getItem("memberId");
  
    if (accessToken && userId && memberId) {
      profileLink.style.display = 'block';
    }
  
    profileLink.addEventListener('click', async (event) => {
      event.preventDefault();
      await fetchProfileInfo(userId, memberId);
      profileModal.style.display = 'block';
    });
  
    closeModal.onclick = () => {
      profileModal.style.display = 'none';
    };
  
    window.onclick = (event) => {
      if (event.target === profileModal) {
        profileModal.style.display = 'none';
      }
    };
  
    async function fetchProfileInfo(userId, memberId) {
      try {
        const userResponse = await fetch(`https://localhost:7171/api/User/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
  
        const memberResponse = await fetch(`https://localhost:7171/api/Members/${memberId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!userResponse.ok || !memberResponse.ok) {
          throw new Error('Failed to fetch profile information');
        }
  
        const user = await userResponse.json();
        const member = await memberResponse.json();
  
        profileInfo.innerHTML = `
          <img src="${member.photo}" alt="Profile Picture">
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Profession: ${member.profession}</p>
          <p>Nationality: ${member.nationality}</p>
        `;
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching profile information.');
      }
    }
  });
  