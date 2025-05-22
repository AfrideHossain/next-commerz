export default function TextAreaInfoModal() {
  return (
    <>
      <dialog id="textAreaInfoModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Markdowns</h3>
          <div className="py-4">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Markdown Syntax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Heading</p>
                  </td>
                  <td>
                    <code>
                      ## H2
                      <br />
                      ### H3
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Bold</strong>
                  </td>
                  <td>
                    <code>**bold text**</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>Italic</em>
                  </td>
                  <td>
                    <code>*emphasized text*</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Ordered List</p>
                  </td>
                  <td>
                    <code>
                      1. First item
                      <br />
                      2. Second item
                      <br />
                      3. Third item
                      <br />
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Unordered List</p>
                  </td>
                  <td>
                    <code>
                      - First item
                      <br />
                      - Second item
                      <br />
                      - Third item
                      <br />
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Horizontal Rule</p>
                  </td>
                  <td>
                    <code>---</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Link</p>
                  </td>
                  <td>
                    <code>[title](https://www.example.com)</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Image</p>
                  </td>
                  <td>
                    <code>![alt text](image.jpg)</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
