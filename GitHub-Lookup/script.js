const container = document.querySelector('.container');
const button = document.querySelector('.search');
const error404 = document.querySelector('.err404');

const card = document.querySelector('.card');
const login = document.querySelector('.card-username');
const bio = document.querySelector('.card-bio');
const followers = document.querySelector('.card-followers');
const following = document.querySelector('.card-following');
const githubProfile = document.querySelector('.card-profile');
const blog = document.querySelector('.card-blog');
const avatar = document.querySelector('.card-avatar');
const repos = document.querySelector('.card-repos');

button.addEventListener('click', async () => {
    card.classList.add('hidden');
    error404.classList.add('hidden');

    const input = document.querySelector('input');
    const username = input.value.trim();

    if (!username) {
        alert('Please enter a username');
        return;
    }

    const url = `https://api.github.com/users/${username}`;
    input.value = '';
    input.placeholder = 'Loading...';
    input.disabled = true;

    try {
        const response = await fetch(url);
        const data = await response.json();

        container.style.height = '150px';

        setTimeout(() => {
            input.placeholder = 'Example: KevinSiddhpura';
            input.disabled = false;

            if (response.status === 404) {
                container.style.height = 'auto';
                error404.classList.remove('hidden');
                return;
            }

            error404.classList.add('hidden');
            container.style.height = 'auto';

            login.textContent = data.login || 'N/A';
            bio.textContent = data.bio || 'Bio not available';
            followers.textContent = data.followers || 0;
            following.textContent = data.following || 0;
            githubProfile.href = data.html_url;
            blog.href = data.blog || data.html_url;
            avatar.src = data.avatar_url || '';
            repos.textContent = data.public_repos || 0;

            card.classList.remove('hidden');
        }, 2000);
    } catch (error) {
        console.error(error);
    }
});