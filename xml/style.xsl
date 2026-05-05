<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>XML Data Transformation</title>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        background: #0f172a;
                        color: #f1f5f9;
                        padding: 50px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .container {
                        max-width: 800px;
                        background: rgba(30, 41, 59, 0.7);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    }
                    h1 { color: #38bdf8; text-align: center; margin-bottom: 30px; }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 40px;
                    }
                    th, td {
                        padding: 15px;
                        text-align: left;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    th {
                        background: #38bdf8;
                        color: white;
                    }
                    .back-btn {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: #38bdf8;
                        color: white;
                        text-decoration: none;
                        border-radius: 50px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>XML Transformed Data</h1>
                    
                    <h2>Skills Inventory</h2>
                    <table>
                        <tr>
                            <th>Skill Name</th>
                            <th>Expertise Level</th>
                        </tr>
                        <xsl:for-each select="portfolio/skills/skill">
                            <tr>
                                <td><xsl:value-of select="name"/></td>
                                <td><xsl:value-of select="level"/></td>
                            </tr>
                        </xsl:for-each>
                    </table>

                    <h2>Projects Overview</h2>
                    <table>
                        <tr>
                            <th>Project Title</th>
                            <th>Category</th>
                        </tr>
                        <xsl:for-each select="portfolio/projects/project">
                            <tr>
                                <td><xsl:value-of select="title"/></td>
                                <td><xsl:value-of select="category"/></td>
                            </tr>
                        </xsl:for-each>
                    </table>

                    <h2>Academic Records (XSLT Conditionals)</h2>
                    <table>
                        <tr>
                            <th>Student Name</th>
                            <th>GPA</th>
                            <th>Status (Conditional)</th>
                        </tr>
                        <xsl:for-each select="portfolio/academics/student">
                            <tr>
                                <td><xsl:value-of select="name"/></td>
                                <td>
                                    <xsl:if test="gpa &gt; 9.0">
                                        <span style="color: #10b981; font-weight: 800;"> ★ <xsl:value-of select="gpa"/></span>
                                    </xsl:if>
                                    <xsl:if test="gpa &lt;= 9.0">
                                        <xsl:value-of select="gpa"/>
                                    </xsl:if>
                                </td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="status = 'Scholar'">
                                            <mark style="background: #10b981; color: white; padding: 2px 8px; border-radius: 4px;">Top Performer</mark>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="status"/>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>

                    <a href="../projects.html" class="back-btn">Back to Portfolio</a>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
