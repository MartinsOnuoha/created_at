const axios = require('axios');
const format = require('date-fns/format')

class AppController {
  /**
   * Render home page
   * @param {RequestObject} req
   * @param {ResponseObject} res
   * @returns
   */
  static home(req, res) {
    let {host} = req.headers;
    if (host.includes('localhost')) {
      host = `http://${host}/`
    } else {
      host = `https://${host}/`
    }
    return res.render('index', { host })
  }
  /**
   * Get the repository data
   * @param {RequestObject} req
   * @param {ResponseObject} res
   * @returns
   */
  static async getRepositoryData(req, res) {
    const url = req.query.url;
    if (url) {
      const result = await axios.get(`${url}`).then(result => result.data).catch(e => res.status(400).json({ msg: e, error: true }));
      const { full_name, description, html_url, created_at } = result

      return res.json({
        full_name,
        description,
        html_url,
        created_at: format(new Date(created_at), 'PPPpp'),
        how_old: new Date().getFullYear() - new Date(created_at).getFullYear(),
        avatar: result.owner.avatar_url,
      })
    }
    return res.status(400).json({ error: true, msg: 'provide a URL' })
  }
}

module.exports = AppController;
