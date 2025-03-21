window.onscroll = () => {
    const header = document.querySelector('#header');
    const pesquisa = document.querySelector('.pesquisa');
    const banner = document.querySelector('.banner');
    
    header.classList.toggle('rolagem', window.scrollY > 200);
    banner.classList.toggle('desfoque', pesquisa.getBoundingClientRect().top < window.innerHeight && window.scrollY > 0);
};