const { Token } = require("../models");
const { isAddress } = require("ethers");

module.exports = {

  list(req, res) {
    Token.findAll()
      .then((tokens) => {
        res.status(200).json({
          error: false,
          data: tokens,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  },


  add(req, res) {
    const { name, symbol, address } = req.body;

    Token.create({
      name,
      symbol,
      address,
    })
      .then((token) => {
        res.status(201).json({
          error: false,
          data: token,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  },

  // DELETE TOKEN
  delete(req, res) {
    const { address } = req.body;

    Token.destroy({
      where: { address },
    })
      .then(() => {
        res.status(200).json({
          error: false,
          message: "token has been deleted",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  },

  async nftAnalytics(req, res) {
    try {

      const tokens = await Token.findAll();

      if (!tokens || tokens.length === 0) {
        return res.status(200).json({
          error: false,
          data: {
            totalNFTs: 0,
            walletAddresses: []
          }
        });
      }

      const totalNFTs = tokens.length;

      let addresses = tokens.map(token => token.address);

      addresses = addresses.filter(addr => isAddress(addr));

      const uniqueAddresses = [...new Set(addresses)];

      return res.status(200).json({
        error: false,
        data: {
          totalNFTs,
          walletAddresses: uniqueAddresses
        }
      });

    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }

};