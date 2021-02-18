/**
 * Fetch repo details
 */
function fetchData() {
  const cardContainer = document.getElementById('image')
  const template = document.createElement('template');
  const card = document.getElementById('card');
  const url = document.getElementById('url').value.replace('.git', '')

  if (!url) {
    return false;
  }
  const pathArray = url.split('/');
  const path = `${pathArray[pathArray.length - 2]}/${pathArray[pathArray.length - 1]}`
  console.log(`https://api.github.com/repos/${path}`)

  if (card) {
    card.remove()
  }
  fetch(`/get-data?url=https://api.github.com/repos/${path}`)
    .then((response) => response.json())
    .then(data => {

      let value = `
        <div class="card" id="card">
          <div class="card-container">
            <div class="card-image">
              <img class="repo_avatar" src="${data.avatar}" alt="">
              <p style="margin-left: 10px;"><a href="${data.html_url}">${trunCate(data.full_name, 10)}</a></p>
            </div>
            <div class="date">${data.created_at}</div>
          </div>
          <div class="age">
            Created ${data.how_old === 0 ? 'This Year' : `${data.how_old} Years ago` }
          </div>
        </div>
      `;
      value = value.trim();
      template.innerHTML = value
      cardContainer.appendChild(template.content.firstChild)
    })
}
/**
 * truncate text
 * @param {String} val String to truncate
 * @param {Number} length Truncate at index?
 */
function trunCate(val, length) {
  if (val.length > length) {
    return `${val.substr(0, length)}...`
  }
  return val
}
